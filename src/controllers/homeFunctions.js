/**
 * Función que extrae datos específicos de un conjunto de datos clasificados para su uso en tarjetas.
 * @function getDataForCards
 * @param {Array} dataRank - Array de objetos representando datos clasificados.
 * @returns {Object} Un objeto que contiene información específica para su uso en tarjetas.
 */

function getDataForCards(dataRank) {
  const dataForCards = dataRank[0]
    ? {
        name: dataRank[0].name,
        sold_sum: dataRank[0].sold_sum,
        sold_count: dataRank[0].sold_count,
        stock: dataRank[0].stock,
      }
    : {
        name: "",
        sold_sum: 0,
        sold_count: 0,
        stock: 0,
      };

  return dataForCards;
}

export { getDataForCards };
