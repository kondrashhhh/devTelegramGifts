    import React from 'react'
    import cn from 'classnames'
    import styles from './Flex.module.scss'

    export const Flex = ({ children, className }) => {
    return (
        <div className={cn(styles.flex, className)}>
            {children}
        </div>
    )
    }
