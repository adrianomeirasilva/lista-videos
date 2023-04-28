import { conectaApi } from "./conectaApi.js";
import constroiCard from "./mostrarVideos.js";

async function buscaVideo(evento){
	evento.preventDefault();

	const dadosPesquisa = document.querySelector("[data-pesquisa]").value;
	const busca = await conectaApi.buscaVideo(dadosPesquisa);

	const lista = document.querySelector("[data-lista]");

	console.log(lista);

	while( lista.firstChild ){
		lista.removeChild( lista.firstChild );
	}

	busca.forEach(elemento => lista.appendChild( 
		constroiCard(elemento.titulo, elemento.descricao, elemento.url, elemento.imagem)
	));

	if( busca.length == 0 ){
		lista.innerHTML = `<li class="lista__erro">Não existe nenhum item na lista com o termo:${dadosPesquisa}</li>`;
	}

	console.log(dadosPesquisa);
}

async function resetarLista(evento){
	evento.preventDefault();
	const lista = document.querySelector("[data-lista]");

	while( lista.firstChild ){
		lista.removeChild( lista.firstChild );
	}

	try {
		const listaApi = await conectaApi.listaVideos();
		listaApi.forEach( elemento => lista.appendChild(
			constroiCard(elemento.titulo, elemento.descricao, elemento.url, elemento.imagem)
		) );

	} catch {
		lista.innerHTML = `<li class="mensgem__tutlo">Não foi possível carregar a lista de vídeos</li>`;
	}


}

const botaoResetar = document.querySelector("[data-resetar]");
botaoResetar.addEventListener("click", evento => resetarLista(evento) );

const botaoPesquisa = document.querySelector("[data-botao-pesquisa]");
botaoPesquisa.addEventListener("click", evento => buscaVideo(evento) );


