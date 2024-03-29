import React, { useContext } from 'react';
import { TiDelete } from 'react-icons/ti';
import { AppContext } from '../context/AppContext';
import './ExpenseItem.css';

const ExpenseItem = ({ id, name, cost }) => {
    const { dispatch, currency } = useContext(AppContext);

    const handleDeleteExpense = () => {
        dispatch({
            type: 'DELETE_EXPENSE',
            payload: id,
        });
    };

    const handleModifyExpense = (amount) => {
        dispatch({
            type: amount > 0 ? 'ADD_EXPENSE' : 'RED_EXPENSE',
            payload: {
                id,
                name,
                cost: Math.abs(amount),
            }
        });
    };

    return (
        <tr>
            <td>{name}</td>
            <td>{currency}{cost}</td>
            <td className="text-center">
                <button className="btn btn-link" onClick={() => handleModifyExpense(10)}>
                    <img src={`${process.env.PUBLIC_URL}/Bplus.png`} alt="Increase" />
                </button>
            </td>
            <td className="text-center">
                <button className="btn btn-link" onClick={() => handleModifyExpense(-10)} disabled={cost <= 10}>
                    <img src={`${process.env.PUBLIC_URL}/Bminus.png`} alt="Decrease" />
                </button>
            </td>
            <td className="text-center">
                <button className="btn btn-link text-danger" onClick={handleDeleteExpense}>
                    <TiDelete size='1.5em' />
                </button>
            </td>
        </tr>
    );
};

export default ExpenseItem;
