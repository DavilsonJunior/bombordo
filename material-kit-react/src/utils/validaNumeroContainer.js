export const validaNumeroContainer = (numberContainer = '') => {
  try {
    let numberPattern = /\d+/g;
    let textPattern = /\D+/g;

    numberPattern = numberContainer.match( numberPattern ).join('');
    textPattern = numberContainer.match( textPattern ).join('');

    return (numberPattern.length === 7 && textPattern.length === 4) ?  true : false;
  } catch (err) {
    return false;
  }
}
