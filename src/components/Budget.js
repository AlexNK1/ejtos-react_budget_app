import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';

const Budget = () => {
    const { budget, expenses, dispatch, currency } = useContext(AppContext); // Destructure currency here
    const [newBudget, setNewBudget] = useState(budget);
    
    const totalSpent = expenses.reduce((acc, expense) => acc + expense.cost, 0);

    const handleBudgetChange = (event) => {
        setNewBudget(Number(event.target.value));
    };

    const handleBudgetSubmit = () => {
        if (newBudget < totalSpent) {
            window.alert(`Budget cannot be less than the total spent: ${currency}${totalSpent}`); // Use currency in the alert
            return; 
        }
        
        if (newBudget > 20000) {
            window.alert('Budget cannot exceed £20,000'); // Consider also using the currency symbol here
            return; 
        }

        dispatch({
            type: 'SET_BUDGET',
            payload: newBudget,
        });
    };

    return (
        <div>
            <div className='alert alert-secondary'>
                <span>Budget: {currency}{budget}</span> {/* Use currency variable here */}
                <input
                    type="number"
                    step="10"
                    value={newBudget}
                    onChange={handleBudgetChange}
                    className="mx-2"
                />
                <button onClick={handleBudgetSubmit} className="btn btn-primary-sm btn-sm">
                    Update
                </button>
            </div>
            {/* It seems you've got a duplicate div here. I've removed it for clarity. */}
        </div>
    );
};

export default Budget;
