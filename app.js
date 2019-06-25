document.getElementById('loan-form').addEventListener('submit', function(e) {
  document.getElementById('results').style.display = 'none';
  document.getElementById('loading').style.display = 'block';

  calculateResults();

  e.preventDefault();
});

function calculateResults() {
  console.log('Calculating...');

  const uiAmount = document.getElementById('amount');
  const uiInterest = document.getElementById('interest');
  const uiYears = document.getElementById('years');
  const uiMonthlyPayment = document.getElementById('monthly-payment');
  const uiTotalPayment = document.getElementById('total-payment');
  const uiTotalInterest = document.getElementById('total-interest');

  const principal = parseFloat(uiAmount.value);
  const calculatedInterest = parseFloat(uiInterest.value) / 100 / 12;
  const calculatedPayments = parseFloat(uiYears.value) * 12;


  const x = Math.pow(1 + calculatedInterest, calculatedPayments);
  const monthly = (principal * x * calculatedInterest) / (x - 1);

  if (isFinite(monthly)) {
    setTimeout(function() {
      uiMonthlyPayment.value = monthly.toFixed(2);
      uiTotalPayment.value = (monthly * calculatedPayments).toFixed(2);
      uiTotalInterest.value = ((monthly * calculatedPayments) - principal).toFixed(2);
      document.getElementById('results').style.display = 'block';
      document.getElementById('loading').style.display = 'none';
    }, 2000);
  } else {
    document.getElementById('results').style.display = 'none';
    document.getElementById('loading').style.display = 'none';
    showError('Please check your numbers');
  }

}


function showError(error) {
  const uiError = document.createElement('div');
  uiError.className = 'alert alert-danger';
  uiError.appendChild(document.createTextNode(error));

  const card = document.querySelector('.card');
  const heading = document.querySelector('.heading');

  card.insertBefore(uiError, heading);

  setTimeout(clearError, 3000);
}


function clearError() {
  document.querySelector('.alert').remove();
}

