/*
* Importação dos móodulos/arquivos dataset.js e foods.js que se encontram na pasta js/model e carregamento
* do módulo na variável itens e foodsModel, respectivamente, para utilização posterior no código.
* A importação levou em consideração o padrão mais novo trazido pelo EcmaScript 6 ou ES6.
*/
import itens from './model/dataset.js';
import foodsModel from './model/foods.js';


// Carregamento dos itens existentes no localStorage por meio da função load dentro do módulo foods.
foodsModel.load(itens);
/* Atribui à variável foods todos os registros do cardápio salvo no localStore. É executada a função
*  readAll do módulo foods.js, oportunidade em que se ler todos os registros cadastrados no storage
*  'foods-app:foods' e faz um parse da string para JSON.
*/
let foods = foodsModel.readAll();

/**
 * Função que iniciam/carrega todos os registros e gera os card's no estilo CSS do Bootstrap.
 * Pode-se dizer que esta é a função principal do módulo de cardápio, pois ela é iniciada assim que
 * a página de cardápio é carregada. A função é responsável por pegar todos os elementos já cadastrados
 * no localstorage e iterar com eles para criação dos cards, por meio da função createFoodCardItem.
 */
function initFoodsCard () {
  
  // Laço de repetição em todos os itens do cardápio registrados no localStorage
  for (let item of foods) {

    /**
     * Atribui-se à variável view toda a estrutura HTML gerada dinamicamente por meio da função createFoodCardItem.
     * Para cada item do cardápio a função gera dinanicamente os elementos HTML do card e preenchem com
     * os name, image e description de cada objeto.
     */
    const view = createFoodCardItem(item);
  
    // Armazena na variável itensCardapio o elemento div existente no arquivo cardapio.html, a fim de manipulá-lo
    // posteriormente e adicionar um novo elemento child (filho) dentro desta div.
    let itensCardapio = document.getElementById("itens-cardapio");

    /**
     * Com a função insertAdjancentHTML, se analisa o texto especificado como HTML ou XML e insere os nós 
     * que resultam na árvore DOM em uma posição especificada. No caso, pega-se a div que contem o cardápio
     * e incluir um nó dentro do elemento, após o seu último nó filho (chidNode) um novo elemento view.
     */
    itensCardapio.insertAdjacentHTML('beforeend', view);
  }
}

/**
 * 
 * @param { * } item Recebe como parâmetro um item do cardápio contendo um name, image e description.
 * @returns um elemento DOM do tipo card Bootstrap
 * 
 * Função responsável por criar dinamicamente um card Bootstrap para preenchimento dos itens do cardápio.
 * Recebe um elemento do cardápio e retorna uma estrutura HTML de um elemento div já com preenchimento
 * da imagem, do nome e da descrição do produto do cardápio.
 */
function createFoodCardItem (item) {

    /**
     * Atribuição na variável view da estrutura HTML necessária para apresentação do card bootstrap.
     * Os elementos são preenchidos pelos objetos recebidos no parâmetro. A função se utiliza de
     * template string do ES6 (%{var}) para o preenchimento das variáveis.
     */
    const image = item.image || './images/product_default.png'
    const view = `<div class="col-3 card my-1 mx-1 py-1">
                    <img src="${image}" class="card-img-top" alt="${item.name}">
  
                    <div class="card-body">
                      <h5 class="card-title">${item.name}</h5>
                      <p class="card-text">${item.description}</p>
                      <hr>
                      <h4 class="text-success">${item.price.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</h4>
                      <a href="#" class="btn btn-primary">Comprar</a>
                    </div>
                  </div>`;

    // Retorno da estrutura HTML
    return view;
}


// Captar o evento de submissão do formulário e adicionar o item no cartão (card).
// Atribui à variável foodForm o formulário de cadastro da modal do cardápio
const foodForm = document.getElementById("foodForm");

/**
 * 
 * @param {*} event Captura o evento disparado que no caso é o onSubmit
 * 
 * Captura o evento onSubmit do formulário sempre que é adicionado algum item ao cardápio
 * por meio do botão "Adicionar" do formulário modal.
 */
foodForm.onsubmit = function (event) {
  /**
   * Previnir que o modal fique abrindo e fechando em loop.
   * Chamar preventDefault durante qualquer fase do fluxo de eventos cancela o evento, 
   * o que significa que qualquer ação padrão normalmente feita pela aplicação como um resultado
   * do evento não ocorrerá.
   */
  event.preventDefault();

  /**
   * A interface FormData fornece uma maneira fácil de construir um conjunto de pares chave/valor 
   * representando campos de um elemento form e seus valores.
   * Essa interface utiliza o mesmo formato que um form utilizaria se o tipo de codificação estivesse 
   * configurado como "multipart/form-data". Basicamente os dados enviados pelo formulário são distribuídos
   * entre chaves e valores possibilitando a sua manipulação mais fácil, inclusive via ajax.
   * 
   * Por sua vez, o método Object.fromEntries() transforma uma lista de pares chave-valor em um objeto.
   * Com isso, vê-se que a combinação da função Object.fromEntries com new FormData se torna perfeita para
   * distribuição dos dados em formato de objeto (chave e valor), de modo a permitir a sua posterior
   * manipulação. 
   */
  let newFood = Object.fromEntries(new FormData(foodForm));

  /**
   * Com os dados do formulário tratados em modo de chave:valor fica fácil para a função create do módulo
   * foods.js criar um novo item e incluí-lo no array de objetos para salvamento no localStorage
   */
  foodsModel.create(newFood);

  // De forma dinâmica acontece os mesmos passos já comentados nas linhas 29 a 45, a qual fazemos remissão.
  const foodCard = createFoodCardItem(newFood);
  let itensCardapio = document.getElementById("itens-cardapio");
  itensCardapio.insertAdjacentHTML('beforeend', foodCard);

  // Resetar o formulário
  alertSuccess();
  foodForm.reset();
}

/**
 * 
 * @param { success, info, danger } type Tipo da mensagem. 
 * @param { message: string } message Mensagem a ser exibida.
 * 
 * Função para exibir a mensagem de sucesso a cada novo item cadastrado
 */
function alertSuccess(type = "success", message = "Item cadastrado com sucesso.") {
  document.querySelector("#alert-message").innerHTML =
    `
    <div class="alert alert-${type} alert-dismissible fade show" role="alert">
      <strong>Parabéns!</strong> ${message}
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
    `
}

// Inicialização da função initFoodsCard com o carregamento de todos os itens do cardápio.
initFoodsCard();