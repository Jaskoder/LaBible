import { useEffect } from "react";
import { useAlert } from "../helpers/hooks";
import './styles/alert.css';

function AlertBox() {

    const [alert, setAlert] = useAlert();

    useEffect(() => {
        const timeout = setTimeout(() => setAlert({ message: '', type: '' }), 3000);
        return () => clearTimeout(timeout);
    }, []);

    const icons = {
        success: 'check-circle',
        info: 'info-circle',
        error: 'x-circle',
        warn: 'exclamation-triangle'
    }

    return (
        <div className={`alert-box ${alert?.type}`}>
            <span className="icon"> <i className={`bi bi-${icons[alert?.type || 'info']}`}></i></span>
            <p className="message">{alert?.message}</p>
        </div>
    );
}

export default AlertBox;