import './Footer.css'
import {Link, Page, Stack} from "@shopify/polaris";
export const Footer = () => {
  return (
    <footer className="footer-wrapper_outer" title='footer_text'>
      <div className="footer-wrapper_inner">
        <Page>
          <Stack distribution="center">
          <p>Learn more about {""}
            <Link url="https://github.com/cyberwalley/spacestagram" external accessibilityLabel="github">Spacetagram</Link>
          </p>
          </Stack>
        </Page>
      </div>
    </footer>
  )
}
