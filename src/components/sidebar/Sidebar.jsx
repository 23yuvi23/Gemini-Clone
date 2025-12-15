import "./sidebar.css";
import { assets } from "../../assets/assets";
import { useContext, useState } from "react";
import { Context } from "../../context/Context";

const Sidebar = () => {
    const [extended, setExtended] = useState(false);
    const { onSent, prevPrompts, setRecentPrompt, newChat } = useContext(Context);

    const loadPreviousPrompt = async (prompt) => {
        setRecentPrompt(prompt);
        // Ensure onSent is working correctly, assuming it handles the API call
        await onSent(prompt); 
    };
    
    return (
        <div className="sidebar">
            <div className="top">
                <img
                    src={assets.menu_icon}
                    className="menu"
                    alt="menu-icon"
                    onClick={() => {
                        setExtended((prev) => !prev);
                    }}
                />
                <div className="new-chat" onClick={newChat}> {/* newChat function call directly on div for better UX */}
                    <img src={assets.plus_icon} alt="plus-icon" />
                    {extended ? <p>New Chat</p> : null}
                </div>
                {extended ? (
                    <div className="recent">
                        <p className="recent-title">Recent</p>
                        {/* THE FIX IS HERE (key={index} added) */}
                        {prevPrompts.map((item, index) => {
                            return (
                                <div 
                                    key={index} // <--- 🌟 FIX: unique key added here
                                    onClick={()=>{
                                        loadPreviousPrompt(item)
                                    }} 
                                    className="recent-entry"
                                >
                                    <img src={assets.message_icon} alt="message-icon" />
                                    <p>{item.slice(0, 18)}...</p>
                                </div>
                            );
                        })}
                    </div>
                ) : null}
            </div>
            <div className="bottom">
                <div className="bottom-item recent-entry">
                    <img src={assets.question_icon} alt="question-icon" />
                    {extended ? <p>Help desk</p> : null}
                </div>
                <div className="bottom-item recent-entry">
                    <img src={assets.history_icon} alt="history-icon" />
                    {extended ? <p>History</p> : null}
                </div>
                <div className="bottom-item recent-entry">
                    <img src={assets.setting_icon} alt="setting-icon" />
                    {extended ? <p>Settings</p> : null}
                </div>
            </div>
        </div>
    );
};

export default Sidebar;