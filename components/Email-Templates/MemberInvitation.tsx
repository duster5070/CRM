import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
  Hr,
  Button,
} from "@react-email/components";
import * as React from "react";

export interface InvitationProps {
  memberName: string;
  projectName: string;
  message?: string;
  loginLink?: string;
}

export const MemberInvitation: React.FC<Readonly<InvitationProps>> = ({
  memberName,
  projectName,
  message,
  loginLink,
}) => {
  return (
    <Html>
      <Head />
      <Preview>Invitation to collaborate on {projectName}</Preview>

      <Body className="bg-gray-100 font-sans">
        <Container className="mx-auto my-10 max-w-[600px] rounded-lg bg-white shadow">

         
          <Section className="border-b border-gray-200 px-10 py-12 text-center">
            <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-gray-900 text-xl font-semibold text-white">
              ✦
            </div>

            <Heading className="m-0 text-2xl font-semibold text-gray-900">
              Collaboration Invitation
            </Heading>

            <Text className="mt-3 text-sm text-gray-500">
              {projectName}
            </Text>
          </Section>

         
          <Section className="px-10 py-10">
            <Text className="mb-6 text-base leading-relaxed text-gray-700">
              Hi {memberName},
            </Text>

            {message && (
              <Text className="mb-8 text-base leading-relaxed text-gray-700">
                {message}
              </Text>
            )}

            {loginLink && (
              <Section className="mb-10 text-center">
                <Button
                  href={loginLink}
                  className="rounded-lg bg-gray-900 px-8 py-4 text-sm font-medium text-white"
                >
                  Access Project
                </Button>
              </Section>
            )}

            <Text className="text-center text-sm text-gray-500">
              Looking forward to working with you!
            </Text>
          </Section>

          <Hr className="border-gray-200" />

          <Section className="px-10 py-8 text-center">
            <Text className="text-xs text-gray-400">
              © 2024 Your Company. All rights reserved.
            </Text>
          </Section>

        </Container>
      </Body>
    </Html>
  );
};

export default MemberInvitation;
