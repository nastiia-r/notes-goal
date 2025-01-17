import { ReactNode } from "react"

type HintBoxProps = {
    mode: 'hint';
    children: ReactNode;
}

type WarningBoxProps = {
    mode: 'warning';
    severity: 'low' | 'medium' | 'high';
    children: ReactNode;
}

type InfoBoxProps = HintBoxProps | WarningBoxProps;

export default function InfoBox(props: InfoBoxProps){ //info / warning
    const {mode, children} = props;
    if(mode === 'hint'){
        return <aside className="infobox infobox-hint">
            <p>{children}</p>
        </aside>
    };

    return <aside className={`infobox infobox-warning warning--${props.severity}`}>
            <h2>Warning</h2> 
            <p>{children}</p>
    </aside>
}