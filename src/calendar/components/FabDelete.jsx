import { useCalendarStore, useUiStore } from "../../hooks"

export const FabDelete = () => {

    const { activeEvent } = useCalendarStore();


    const onClick = () => {

        if (activeEvent) {

            
    
            setActiveEvent( event )
    
            openDateModal();
        }
    }

    return (
        <button
            className="btn btn-primary fab"
            onClick={ onClick }
        >
            <i className="fas fa-plus fa-xl"></i>

        </button>
    )
}
