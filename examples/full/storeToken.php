<?php
$cacheFileName = "cachedToken.dat";
file_put_contents($cacheFileName, $_GET['token']);
$cacheFileNameData = "cachedTokenData.dat";
file_put_contents($cacheFileNameData, $_GET['data']);
?>