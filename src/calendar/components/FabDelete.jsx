import { useCalendarStore, useUiStore } from "../../hooks";

export const FabDelete = () => {

    const { activeEvent, startDeletingEvent, hasEventSelected } = useCalendarStore();
    const { isDateModalOpen } = useUiStore();

    const onClick = () => {

        if (activeEvent) {
            startDeletingEvent();
        }
    }

    return (
        <button
            className="btn btn-danger fab fab-delete"
            onClick={ onClick }
            style={{ display: ( !hasEventSelected || isDateModalOpen) ? 'none' : '' }}
        >
            <i className="fas fa-trash-alt fa-xl"></i>

        </button>
    )
}
