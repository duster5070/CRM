import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Tailwind,
  Text,
} from '@react-email/components';
import emailTailwindConfig from '../../email-tailwind.config';

export interface InvoiceLinkProps {
  invoiceLink?: string;
  previewText: string;
  title: string;
  userName: string;
}

const baseUrl = process.env.NEXTAUTH_URL;

export const InvoiceLink = ({
  invoiceLink,
  previewText,
  title,
  userName,
}: InvoiceLinkProps) => (
  <Html>
    <Head />
    <Tailwind config={emailTailwindConfig}>
      <Body className="bg-white font-raycast">
        <Preview>{previewText}</Preview>

        <Container className="mx-auto my-0 pt-5 px-[25px] pb-12 bg-[url('/static/raycast-bg.png')] [background-position:bottom] [background-repeat:no-repeat]">
          <Heading className="text-[28px] font-bold mt-12">
            {title}
          </Heading>

          <Section className="my-6 mx-0">
            <Text className="text-base leading-6.5">
              Hope you’re having a great day! Your invoice is ready.
            </Text>

            <Text className="text-base leading-6.5">
              <Link className="text-[#FF6363]" href={invoiceLink}>
                👉 View your invoice 👈
              </Link>
            </Text>
          </Section>

          <Text className="text-base leading-6.5">
            Best regards,<br />
            {userName}
          </Text>

          <Hr className="border-[#dddddd] mt-12" />

          <Text className="text-[#8898aa] text-xs leading-6 ml-1">
            If you have any questions, feel free to reply to this email.
          </Text>
        </Container>
      </Body>
    </Tailwind>
  </Html>
);

export default InvoiceLink;
