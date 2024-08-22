import React, {useState} from 'react'

import CombinedData from './CombinedData'

const CombinedDataContextProvider= ({children}) => {
    const [data, setData] = useState(null)
    return (
        <CombinedData.Provider value={{data, setData}}>
            {children}
        </CombinedData.Provider>
    )

}


export default CombinedDataContextProvider