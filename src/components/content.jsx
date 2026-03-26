import { useTitle } from '../helpers/hooks';
import './styles/content.css'; 


export default function Content({ children }) {

    const [title, setTitle] = useTitle();
    return (

        <div className='content-wrapper'>
            <div className='title'>
                <h2>{title}</h2>
            </div>
            <div className='content'>{children}</div>
        </div>
    )
}