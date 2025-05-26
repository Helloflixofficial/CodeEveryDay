<?php
$a = 5000;
if ($a >= 10000) {
    $dis = ($a * 20) / 100;
} elseif ($a >= 5000 && $a < 10000) {
    $dis = ($a * 10) / 100;
} else {
    $dis = "No discount sorry";
}
$b =  is_numeric($dis) ? $a - $dis : $a;
$pay = ($b * 18)/100;
$data = $pay + $b;

$num = 121;
$Onum = $num;
$Rnum = 0;
while ($num > 0) {
    $digit = $num % 10;
    $Rnum = $Rnum * 10 + $digit;
    $num = intval($num / 10);
}


if ($Onum == $Rnum) {
echo "Number is a palindrome 0mUT";
} else {
 echo "Number is not a palindrome";
}






$purchase_amount = 2000;
$payment_mode = "cradit card";
if($purchase_amount =="Cradit Card") {
    $disccount=$purchase_amount*0.15;
}else{
    $disccount=$purchase_amount*0.10;
        if($disccount="Cradit Card")
         {
          $disccount=$purchase_amount*0.10;
            }else {
                $disccount=$purchase_amount*0.05;
            }
        } 


      
$String = "welcome";
$v = 0;
$c = 0;
for ($i = 0; $i < strlen($String); $i++) {
    $ch = $String[$i];
    if ($ch == 'a' || $ch == 'e' || $ch == 'i' || $ch == 'o' || $ch == 'u') {
        $v++ ;
    }
    else{
        $c++ ;
        $main = $c;
    }
}




?>
