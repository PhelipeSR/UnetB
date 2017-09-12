/* Atribui ao evento click do formulário a função de validação de dados */
var form = document.getElementById("botao_cadastro");
if (form.addEventListener){
	form.addEventListener("click", validaCadastro);
} else if (form.attachEvent){
	form.attachEvent("onclick", validaCadastro);
}

/* Função para validar os dados antes da submissão dos dados */
function validaCadastro(evt){

	var name = document.getElementById('name');
	var email = document.getElementById('email');
	var password = document.getElementById('password');
	var confpass = document.getElementById('confpass');
	var filtro_email = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
	var filtro_name = /^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ' ]+$/;
	var contErro = 0;

	/* Validação do campo email */
	caixa_email = document.querySelector('#msg-email-cad');
	if(email.value == ""){
		formataErro(caixa_email," Favor preencher o E-mail.");
		contErro += 1;
	}else if(!filtro_email.test(email.value)){
		formataErro(caixa_email," E-mail no formato inválido.");
		contErro += 1;
	}else{
		caixa_email.style.display = 'none';
	}

	/* Validação do campo password*/
	caixa_password = document.querySelector('#msg-password-cad');
	if(password.value == ""){
		formataErro(caixa_password," Favor preencher a senha.");
		contErro += 1;
	}else if(password.value.length < 6){
		formataErro(caixa_password," Senha deve ter no mínimo 6 caracteres.");
		contErro += 1;
	}else{
		caixa_password.style.display = 'none';
	}

	/* Confirmar senha*/
	caixa_confpass = document.querySelector('#msg-confpass-cad');
	if(confpass.value == ""){
		formataErro(caixa_confpass," Favor preencher a confirmação de senha.");
		contErro += 1;
	}else if(confpass.value != password.value){
		formataErro(caixa_confpass," As senhas são diferentes.");
		contErro += 1;
	}else{
		caixa_confpass.style.display = 'none';
	}

	/* Validação do campo name */
	caixa_name = document.querySelector('#msg-name-cad');
	if(name.value == ""){
		formataErro(caixa_name," Favor preencher o nome.");
		contErro += 1;
	}else if(name.value.length < 3){
		formataErro(caixa_name," O nome deve conter no mínimo 3 letras.");
		contErro += 1;
	}else if(!filtro_name.test(name.value)){
		formataErro(caixa_name," O nome deve conter apenas letras.");
		caixa_name.style.display = 'block';
		contErro += 1;
	}else{
		caixa_name.style.display = 'none';
	}


	caixa_cadastro = document.getElementById('msg-cadastro');
	caixa_cadastro.style.display = 'none';

	if(contErro > 0){
		evt.preventDefault();
	}else{
		$(document).ready( function(){

			$.ajax({
				url: '../controllers/register-controller.php',
				method: 'post',
				data: $('#form-cadastro').serialize(),
				
				success: function(retorno){
					caixa_cadastro = document.getElementById('msg-cadastro');

					if(retorno == '2'){
						$('#email').val('');
						$('#password').val('');
						$('#confpass').val('');
						$('#name').val('');
						formataSuccess(caixa_cadastro,' Cadastro realizado com sucesso.');
					}
					else if(retorno == '1'){
						formataErro(caixa_cadastro,' Email já cadastrado.');
					}else{
						formataErro(caixa_cadastro,' Erro ao conectar ao banco de dados.');
					}
				},

				beforeSend: function(){
					$('#botao_cadastro').prop("disabled",true);
					$('#gif_registro').show();
				},
				complete: function(){
					$('#botao_cadastro').prop("disabled",false);
					$('#gif_registro').hide();
				},
				erro: function(){
					$('#botao_cadastro').prop("disabled",false);
					$('#gif_registro').hide();
					formataErro(caixa_cadastro,' Erro interno.');
				},
			});
		});
	}
}
/* Função para formatar as mansagens de erro*/
function formataErro(elemento,texto){
	$(elemento).removeClass();
	$(elemento).addClass('msg-erro');
	elemento.innerHTML = "<span class='glyphicon glyphicon-exclamation-sign' aria-hidden='true'></span>" + texto;
	elemento.style.display = 'block';
}

/* Função para formatar as mansagens de sucesso*/
function formataSuccess(elemento,texto){
	$(elemento).removeClass();
	$(elemento).addClass('msg-success');
	elemento.innerHTML = "<span class='glyphicon glyphicon glyphicon-ok' aria-hidden='true'></span>" + texto;
	elemento.style.display = 'block';
}