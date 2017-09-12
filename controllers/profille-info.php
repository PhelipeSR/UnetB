<?php
	if (!isset($_SESSION)) session_start();
	if(!isset($_SESSION['id'])){
		header('location:home-view.php');
	}

	require_once "../classes/class-UnetbDB.php";
	require_once "../functions/hash.php";

	function getUserData($id){
		$mySQL = new MySQL;
		$result = $mySQL->executeQuery("SELECT * FROM user WHERE user_id = '$id'");
		$mySQL->disconnect();
		$data = mysqli_fetch_assoc($result);
		return $data;
	}

	function showCourse(){
		global $data;
		$course = array("", "Administração","Agronomia","Arquitetura e Urbanismo","Arquivologia","Artes Cênicas","Artes Plásticas","Biblioteconomia","Ciência da Computação","Ciência Política","Ciências Ambientais","Ciências Biológicas","Ciências Contábeis","Ciências Econômicas","Ciências Farmacêuticas","Ciências Sociais","Comunicação Organizacional","Comunicação Social","Design","Direito","Educação Física","Enfermagem e Obstetrícia","Engenharia Ambiental","Engenharia Civil","Engenharia de Computação","Engenharia de Redes de Comunicação","Engenharia de Produção","Engenharia Elétrica","Engenharia Florestal","Engenharia Mecânica","Engenharia Mecatrônica","Estatística,Filosofia","Física,Geofísica","Geografia","Geologia","Gestão de Políticas Públicas","Gestão de Agronegócio","Gestão em Saúde Coletiva","História", "Letras", "Matemática"," Medicina", "Medicina Veterinária","Museologia","Música", "Nutrição", "Odontologia", "Pedagogia", "Psicologia", "Química", "Química Tecnológica", "Relações Internacionais", "Serviço Social", "Turismo","Visuais");
		
		for($i = 0; $i<count($course); $i++){
			if($data['course'] != $course[$i])
				echo "<option value=\"$course[$i]\">".$course[$i]."</option>\n";
			else{
				echo "<option value=\"$course[$i]\" selected>".$course[$i]."</option>\n";
			}
		}
	}
	$data = getUserData($_SESSION['id']);
?>