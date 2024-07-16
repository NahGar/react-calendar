import { addHours } from "date-fns";
import { useCalendarStore, useUiStore } from "../../hooks"

export const FabAddNew = () => {

    const { isDateModalOpen, openDateModal } = useUiStore();
    const { setActiveEvent } = useCalendarStore();


    const onClick = () => {

        if (!isDateModalOpen) {

            const event = {
                title: '',
                notes: '',
                start: new Date(),
                end: addHours( new Date(), 1 ),
                bgColor: '#fafafa',
                user: {
                    _id: '',
                    name: ''
                }
            }
    
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
