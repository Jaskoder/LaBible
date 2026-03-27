import { useTheme } from "../helpers/hooks";
import "./styles/settings.css";

function SettingBox() {

    const [theme, setTheme] = useTheme();
    const darkThemes = ["light", 'dark'];

    return (
        <div className="settings">
            <div className="group theme-group">
                <span className="label">Thèmes sombres</span>
                {
                    darkThemes.map((them) => (
                        <button
                            className={`${theme === them && 'active'}`}
                            onClick={() => setTheme(them)}
                        >{them}</button>
                    ))
                }
                <span className="label">Themes claires</span>
            </div>
        </div>
    )
}

export default SettingBox