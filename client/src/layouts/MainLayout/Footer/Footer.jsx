import React from 'react'
import { Link } from 'react-router'
import { ContainerFluid } from '@/components/ContainerFluid/ContainerFluid'
import { Messangers } from '@/components/Messangers/Messangers'
import { links } from './content'
import Logo from '@/components/Logo/Logo'
import styles from './Footer.module.scss'

export default function Footer() {
  return (
    <footer>
      <ContainerFluid>
        <div className={styles.wrapper}>
          <div className={styles.info}>
            <Logo type="big" />
            <div className={styles.description}>
              <span>
                    ОсОО «Транстрейд» <br />
                    ОГРН: 310961-3301-ООО <br />
                    ИНН: 9909710251 <br />
                    Кыргызская Республика, г. Бишкек, Ленинский район, ул. Калык Акиева, 66
              </span>
            </div>
            <Messangers type="big" />
          </div>
          <div className={styles.links}>
            {
              links.map((item, _) => (
                <div className={styles.list} key={_}>
                  <div className={styles.listTitle}>
                    {item.title}
                  </div>
                  <ul>
                    {
                      item.items.map((link, index) => (
                        <li 
                         className={styles.listItem}
                         key={index}
                        >
                          <Link to={link.url}>
                            {link.title}
                          </Link>
                        </li>
                      ))
                    }
                  </ul>
                </div>
              ))
            }
          </div>
        </div>
      </ContainerFluid>
    </footer>
  )
}
