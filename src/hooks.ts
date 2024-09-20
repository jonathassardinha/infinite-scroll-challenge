import { useState } from "react";

export const useForceUpdate = () => {
    const [, update] = useState(Symbol());
    return () => update(Symbol());
}