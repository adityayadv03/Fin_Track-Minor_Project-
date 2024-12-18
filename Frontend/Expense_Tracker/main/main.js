var ctxPie = document.getElementById('expensePieChart').getContext('2d');
    var expensePieChart = new Chart(ctxPie, {
      type: 'pie',
      data: {
        labels: ['Total Expense', 'Total Income', 'Net Balance'],
        datasets: [{
          data: [3600, 180, 3420], // Replace with dynamic data from the database
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          tooltip: {
            callbacks: {
              label: function(tooltipItem) {
                return tooltipItem.label + ': $' + tooltipItem.raw;
              }
            }
          }
        }
      }
    });
    var ctxDoughnut = document.getElementById('categoryDoughnutChart').getContext('2d');
    var categoryDoughnutChart = new Chart(ctxDoughnut, {
      type: 'doughnut',
      data: {
        labels: ['Home', 'Transportation', 'Entertainment', 'Food', 'Other'],
        datasets: [{
          data: [100, 200, 50, 3600, 120], // Replace with dynamic data from the database
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
          hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF']
        }]
      },
      options: {
        responsive: true,
        cutout: '60%', // Makes the chart a ring/doughnut chart
        plugins: {
          legend: {
            position: 'bottom',
          },
          tooltip: {
            callbacks: {
              label: function(tooltipItem) {
                return tooltipItem.label + ': $' + tooltipItem.raw;
              }
            }
          }
        }
      }
    });


    let api = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`;
    const fromDropDown = document.getElementById("from-currency-select");
    const toDropDown = document.getElementById("to-currency-select");
    
    //Create dropdown from the currencies array
    currencies.forEach((currency) => {
      const option = document.createElement("option");
      option.value = currency;
      option.text = currency;
      fromDropDown.add(option);
    });
    
    //Repeat same thing for the other dropdown
    currencies.forEach((currency) => {
      const option = document.createElement("option");
      option.value = currency;
      option.text = currency;
      toDropDown.add(option);
    });
    
    //Setting default values
    fromDropDown.value = "USD";
    toDropDown.value = "INR";
    
    let convertCurrency = () => {
      //Create References
      const amount = document.querySelector("#amount").value;
      const fromCurrency = fromDropDown.value;
      const toCurrency = toDropDown.value;
    
      //If amount input field is not empty
      if (amount.length != 0) {
        fetch(api)
          .then((resp) => resp.json())
          .then((data) => {
            let fromExchangeRate = data.conversion_rates[fromCurrency];
            let toExchangeRate = data.conversion_rates[toCurrency];
            const convertedAmount = (amount / fromExchangeRate) * toExchangeRate;
            result.innerHTML = `${amount} ${fromCurrency} = ${convertedAmount.toFixed(2)} ${toCurrency}`;
          });
      } else {
        alert("Please fill in the amount");
      }
    };
    
    document
      .querySelector("#convert-button")
      .addEventListener("click", convertCurrency);
    window.addEventListener("load", convertCurrency);
    