import { useTheme } from "../helpers/hooks";
import "./styles/settings.css";

function SettingBox() {

    const [theme, setTheme] = useTheme();
    const themeGroup = ["light", 'dark'];

    return (
        <div className="settings">
            <div className="title">
                <h2>Réglages</h2>
            </div>
            <div className="group theme-group">
                <span className="label">Thème de l'application</span>
                {
                    themeGroup.map((them) => (
                        <button
                            className={`${theme === them && 'active'}`}
                            onClick={() => setTheme(them)}
                        >{them}</button>
                    ))
                }
            </div>
        </div>
    )
}

export default SettingBox