import React from 'react'
import '../style/footer.css'

export default function Footer() {
    return (
        <div className='footer'>
            <div className="footerLinks">
                <p>PRIVACY POLICY </p>
                <span>|</span>
                <p>TERM OF USE </p>
                <span>|</span>
                <p> About ZenCart</p>
            </div>
            <p className='rights'>
                &copy;2024 All rights reserved.
            </p>
        </div>
    )
}
