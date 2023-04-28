const linkApi = 'http://localhost:3000/videos';

async function listaVideos() {
	const conexao = await fetch(linkApi);
	const conexaoConvertida = await conexao.json();
	return conexaoConvertida;
}

async function criaVideo(titulo, descricao, url, imagem){
	const conexao = await fetch(linkApi, {
		method: 'POST',
		headers: {
			'Content-type': 'application/json'
		},
		body: JSON.stringify({
			titulo		: titulo,
			descricao	: `${descricao} mil visualizações`,
			url			: url,
			imagem 		: imagem
		})
	});

	//tratamento de erro
	if(!conexao.ok){
		throw new Error("Não foi possível enviar  vídeo")
	}

	const conexaoConvertida = await conexao.json();
	return conexaoConvertida;
}

async function buscaVideo(termoDeBusca){
	const conexao = await fetch( linkApi+`?q=${termoDeBusca}`);
	const conexaoConvertida = await conexao.json();
	return conexaoConvertida;
}

export const conectaApi = {
	listaVideos,
	criaVideo,
	buscaVideo
}

