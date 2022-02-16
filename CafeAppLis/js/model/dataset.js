/**
 * Módulo com os dados iniciais e estáticos que serão carregados assim que a aplicação do cardápio for inicializada.
 * É atribuída à constante dataset um array de objetos contendo as propriedades id, name, image e 
 * description que serão lidas no módulo cardapio.js e carregadas dinamicamente para o preenchimento dos
 * cards do cardápio, por meio da função load(), do módulo foods.js.
 */
const dataset = [
    {
      id: 1,
      name: 'Hambúrguer',
      image: 'https://www.sabornamesa.com.br/media/k2/items/cache/b9ad772005653afce4d4bd46c2efe842_XL.jpg',
      price: 9.50,
      description:
        'Um hambúrguer é um sanduíche que consiste em um ou mais hambúrgueres cozidos de carne moída, geralmente carne bovina, colocados dentro de um pão ou pão fatiado. O hambúrguer pode ser frito, grelhado, defumado ou grelhado',
    },
    {
      id: 2,
      name: 'Sanduíche',
      image: 'images/sanduiche.jpg',
      price: 7.80,
      description:
        'O sanduíche (do inglês sandwich), também popularmente chamado de sanduba (português brasileiro) ou sandes (português europeu), é um tipo de alimento que consiste em duas fatias de um pão inteiro, entre as quais é colocada carne, queijo ou outro tipo de alimento.Os sanduíches são, habitualmente, consumidos ao lanche ou como uma refeição rápida, durante o almoço ou o jantar.',
    },
    {
      id: 3,
      name: 'Café',
      image: 'images/cafe.jpg',
      price: 4.75,
      description:
        'O café é uma bebida produzida a partir dos grãos torrados do fruto do cafeeiro. É servido tradicionalmente quente, mas também pode ser consumido gelado. O café é um estimulante, por possuir cafeína — geralmente 80 a 140 mg para cada 207 ml dependendo do método de preparação.',
    },
    {
      id: 4,
      name: 'Suco',
      image: 'images/suco.jpg',
      price: 6.50,
      description:
        'Um suco (português brasileiro) ou sumo (português europeu) é uma bebida produzida do líquido extraído de frutos. Além dos frutos, sucos também podem ser obtidos pelo processamento de outras partes dos vegetais, tais como folhas, talos ou raízes.',
    },
  ];
  
  // Exportação padrão do módulo para que possa ser importado em outro módulo, como ocorre no cardapio.js
  export default dataset;