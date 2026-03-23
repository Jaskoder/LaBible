import './styles/content.css';

import ApplictionReader from './reader';
function ApplicationContentDisplayer({ title }) {
    return (
        <div className="content">
            <h1 className="title text-2xl font-bold">{title}</h1>
            <ApplictionReader points={{book : 1, chapter : 1}}></ApplictionReader>
        </div>
    )
}

export default ApplicationContentDisplayer