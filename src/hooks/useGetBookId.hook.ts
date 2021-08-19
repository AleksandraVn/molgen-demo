import {useParams} from "react-router-dom";

export const useGetBookIdHook = () => {
    const {bookId} = useParams<{ bookId: string }>();
    return bookId;
};