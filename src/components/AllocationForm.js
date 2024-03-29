import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';

const AllocationForm = () => {
    const { dispatch, remaining, currency } = useContext(AppContext);

    const [name, setName] = useState('');
    const [cost, setCost] = useState('');
    const [action, setAction] = useState('Add');

    const submitEvent = () => {
        if (parseInt(cost) > remaining) {
            alert(`We are sorry, but the value cannot exceed remaining funds: ${currency}${remaining}`);
            setCost("");
            return;
        }

        const expense = {
            name: name,
            cost: parseInt(cost),
        };

        if (action === "Reduce") {
            dispatch({
                type: 'RED_EXPENSE',
                payload: expense,
            });
        } else {
            dispatch({
                type: 'ADD_EXPENSE',
                payload: expense,
            });
        }
    };

    return (
        <div className="row mt-3">
            <div className="col-sm">
                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <label className="input-group-text" htmlFor="department">Department</label>
                    </div>
                    <select
                        className="custom-select"
                        id="department"
                        onChange={(event) => setName(event.target.value)}
                    >
                        <option defaultValue>Choose...</option>
                        <option value="Marketing">Marketing</option>
                        <option value="Sales">Sales</option>
                        <option value="Finance">Finance</option>
                        <option value="Human Resource">HR</option>
                        <option value="IT">IT</option>
                        <option value="Admin">Admin</option>
                    </select>
                </div>
            </div>
            <div className="col-sm">
                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <label className="input-group-text" htmlFor="allocation">Allocation</label>
                    </div>
                    <select
                        className="custom-select"
                        id="allocation"
                        onChange={(event) => setAction(event.target.value)}
                    >
                        <option value="Add">Add</option>
                        <option value="Reduce">Reduce</option>
                    </select>
                </div>
            </div>
            <div className="col-sm">
                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text">{currency}</span>
                    </div>
                    <input
                        type='number'
                        className="form-control"
                        value={cost}
                        onChange={(event) => setCost(event.target.value)}
                        min="0"
                    />
                </div>
            </div>
            <div className="col-sm">
                <button className="btn btn-primary" onClick={submitEvent}>
                    Save
                </button>
            </div>
        </div>
    );
};

export default AllocationForm;
