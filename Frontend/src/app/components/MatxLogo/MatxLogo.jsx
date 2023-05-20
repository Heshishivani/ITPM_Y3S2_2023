import React from 'react'
import useSettings from 'app/hooks/useSettings'

const MatxLogo = ({ className }) => {
    const { settings } = useSettings()
    const theme = settings.themes[settings.activeTheme]

    return (
        <img
            width="40px"
            height="40px"
            className={className}
            viewBox="0 0 240 239"
            src="/logo.png"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
        >
        </img>
    )
}

export default MatxLogo
