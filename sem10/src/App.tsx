import React from "react";
import { useTranslation } from "react-i18next";
import MessageNotification from "./components/Notificator";

const App: React.FC = () => {
    const { t, i18n } = useTranslation();


    return (
        <div>
            <h1>{t("title")}</h1>
            <MessageNotification />
        </div>
    );
};

export default App;