<nav class="navbar navbar-default navbar-fixed-top navbar-inverse">
	<div class="container-fluid">

		<div class="navbar-header">
			<button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
				<span class="icon-bar"></span>
				<span class="icon-bar"></span>
				<span class="icon-bar"></span>
			</button>
			<a class="navbar-left" href="home-view.php"><img alt="UnetB" src="_images/logo.png"></a>
		</div>
		
		<div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
			
			<ul class="nav navbar-nav navbar-right">
				
				<li><a href="networking-data-view.php">Teste Sua Conexão</a></li>
				<li><a href="information-view.php">Sobre</a></li>
				<li><a href="contact.php">Contato</a></li>
				<li><a href="register-view.php">Cadastrar</a></li>
				<li>
					<button id="btnLogin" type="button" class="btn btn-primary btn-lg" data-toggle="modal" data-target="#logar">
						Entrar
					</button>
				</li>

			</ul>
		</div>
	</div>
</nav>

<?php
	include_once "login-view.php";
?>

		<input type="hidden" id="session" value="
			<?php
				if(!isset($_SESSION['id'])){
					echo '0';
				}else
					echo $_SESSION['id'];
			?>
		">