const expenseForm = document.getElementById('expenseForm');
const expenseList = document.getElementById('expenseList');
const totalAmount = document.getElementById('totalAmount');

let expenses = JSON.parse(localStorage.getItem('expenses')) || [];

function displayExpenses() {
    expenseList.innerHTML = '';
    let total = 0;
    expenses.forEach((expense, index) => {
        const li = document.createElement('li');
        li.textContent = `${expense.name} - $${expense.amount} (${expense.category})`;
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', () => {
            expenses.splice(index, 1);
            localStorage.setItem('expenses', JSON.stringify(expenses));
            displayExpenses();
        });
        li.appendChild(deleteButton);
        expenseList.appendChild(li);
        total += parseFloat(expense.amount);
    });
    totalAmount.textContent = total.toFixed(2);
}

expenseForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const name = document.getElementById('expenseName').value;
    const amount = document.getElementById('expenseAmount').value;
    const category = document.getElementById('expenseCategory').value;

    expenses.push({ name, amount, category });
    localStorage.setItem('expenses', JSON.stringify(expenses));
    displayExpenses();

    expenseForm.reset();
});

displayExpenses();