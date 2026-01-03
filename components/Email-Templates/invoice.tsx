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
} from "@react-email/components";
import emailTailwindConfig from "../../email-tailwind.config";

export interface InvoiceLinkProps {
  invoiceLink?: string;
  previewText: string;
  title: string;
  userName: string;
}

const baseUrl = process.env.NEXTAUTH_URL;

export const InvoiceLink = ({ invoiceLink, previewText, title, userName }: InvoiceLinkProps) => (
  <Html>
    <Head />
    <Tailwind config={emailTailwindConfig}>
      <Body className="font-raycast bg-white">
        <Preview>{previewText}</Preview>

        <Container className="mx-auto my-0 bg-[url('/static/raycast-bg.png')] px-[25px] pb-12 pt-5 [background-position:bottom] [background-repeat:no-repeat]">
          <Heading className="mt-12 text-[28px] font-bold">{title}</Heading>

          <Section className="mx-0 my-6">
            <Text className="leading-6.5 text-base">
              Hope you’re having a great day! Your invoice is ready.
            </Text>

            <Text className="leading-6.5 text-base">
              <Link className="text-[#FF6363]" href={invoiceLink}>
                👉 View your invoice 👈
              </Link>
            </Text>
          </Section>

          <Text className="leading-6.5 text-base">
            Best regards,
            <br />
            {userName}
          </Text>

          <Hr className="mt-12 border-[#dddddd]" />

          <Text className="ml-1 text-xs leading-6 text-[#8898aa]">
            If you have any questions, feel free to reply to this email.
          </Text>
        </Container>
      </Body>
    </Tailwind>
  </Html>
);

export default InvoiceLink;
