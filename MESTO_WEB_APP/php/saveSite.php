<?php
$site = json_decode(file_get_contents("php://input"), true);
// TODO: htmlspecialchars() and json_decode are not compatible for some reason, find a ways to secure data from XSS

try {
    $con = new PDO("mysql:host=localhost;dbname=mesto", "root", "");
    $con->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    if (empty($site['id'])) {
        $stmt = $con->prepare("SELECT count(*) as nbSite FROM site WHERE reference = '".$site['reference']."'");
        $stmt->execute();
        $rs = $stmt->fetchAll();
        
        $arr = array("msg" => "", "error" => "");
        if ($rs[0]['nbSite'] == 0 && !empty($site['reference']) && !empty($site['latitude']) && !empty($site['longitude']) && !empty($site['siteName'])) {
            $sql = 'INSERT INTO site (reference, latitude, longitude, siteName, description, address, city, province, country, postalCode, isTemporary, startDate, endDate, role, pointOfContact, phoneNumberPoC, updateBy, updateDate)'
                .' values ("'.$site['reference'].'","'.$site['latitude'].'","'.$site['longitude'].'","'.$site['siteName'].'","'.$site['description'].'","'.$site['address']
                .'","'.$site['city'].'","'.$site['province'].'","'.$site['country'].'","'.$site['postalCode'].'","'.$site['isTemporary'].'","'.$site['startDate']
                .'","'.$site['endDate'].'","'.$site['role'].'","'.$site['pointOfContact'].'","'.$site['phoneNumberPoC'].'","apps", NOW())';
            $con->exec($sql);
            $arr["msg"] = "Site created successfully!!!";
        } else {
            $arr["error"] = "Site already exists with same reference.";
        }
    }
    else if (!empty($site['id']) && isset($site['activity']) && $site['activity'] == "del") {
        $sql = 'DELETE FROM site WHERE id="'.$site['id'].'"';
        $con->exec($sql);
        $arr = array("msg" => "Site deleted successfully!!!", "error" => "");
    }
    else {
        // TODO: Update reference? That is unique. Need validation or block updating that in GUI.
        // TODO: Update name? That is unique. Need validation or block updating that in GUI.
        $sql = 'UPDATE site SET reference="'.$site['reference'].'", latitude="'.$site['latitude'].'", longitude="'.$site['longitude'].'", siteName="'.$site['siteName']
                    .'", description="'.$site['description'].'", address="'.$site['address'].'", city="'.$site['city'].'", province="'.$site['province']
                    .'", country="'.$site['country'].'", postalCode="'.$site['postalCode'].'", isTemporary="'.$site['isTemporary'].'", startDate="'.$site['startDate']
                    .'", endDate="'.$site['endDate'].'", role="'.$site['role'].'", pointOfContact="'.$site['pointOfContact'].'", phoneNumberPoC="'.$site['phoneNumberPoC'].'", updateBy="apps", updateDate=NOW() WHERE id="'.$site['id'].'"';
        $con->exec($sql);
        $arr = array("msg" => "Site updated successfully!!!", "error" => "");
    }

    $json = json_encode($arr);

    // TODO: Modulirize that
    header('Content-Type: application/json');
    if (!$json) {
        switch (json_last_error()) {
            case JSON_ERROR_NONE:
                echo '[error: JSON - No errors]';
            break;
            case JSON_ERROR_DEPTH:
                echo '[error: JSON  - Maximum stack depth exceeded]';
            break;
            case JSON_ERROR_STATE_MISMATCH:
                echo '[error: JSON  - Underflow or the modes mismatch]';
            break;
            case JSON_ERROR_CTRL_CHAR:
                echo '[error: JSON  - Unexpected control character found]';
            break;
            case JSON_ERROR_SYNTAX:
                echo '[error: JSON  - Syntax error, malformed JSON]';
            break;
            case JSON_ERROR_UTF8:
                echo '[error: JSON  - Malformed UTF-8 characters, possibly incorrectly encoded]';
            break;
            default:
                echo '[error: JSON  - Unknown error]';
            break;
        }
    }
    else {
        echo ")]}',\n";
        echo $json;
    }
}
catch (PDOException $e) {
    /*echo "[error:'".$e->getMessage()."']";*/
    $arr = array("msg" => "", "error" => "Database error, Contact administrator. Try later");
    header('Content-Type: application/json');
	echo $json = json_encode($arr);
}
catch (Exception $e) {
	echo "[error:'".$e->getMessage()."']";
}
finally {
    $con = null;
}
?>