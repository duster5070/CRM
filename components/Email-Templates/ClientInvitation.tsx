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
} from "@react-email/components";
import * as React from "react";

export interface InvitationProps {
  clientName: string;
  projectName: string;
  message: string;
  loginEmail: string;
  loginPassword: string;
  loginLink?: string;
}

export const ClientInvititation: React.FC<Readonly<InvitationProps>> = ({
  clientName,
  projectName,
  message,
  loginEmail,
  loginPassword,
  loginLink,
}) => (
  <div
    style={{
      fontFamily:
        '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      maxWidth: "600px",
      margin: "0 auto",
      backgroundColor: "#ffffff",
    }}
  >
    {/* Header */}
    <div
      style={{
        padding: "48px 40px 32px",
        textAlign: "center",
        borderBottom: "1px solid #e5e7eb",
      }}
    >
      <div
        style={{
          width: "48px",
          height: "48px",
          backgroundColor: "#111827",
          borderRadius: "12px",
          margin: "0 auto 20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <span
          style={{
            color: "#ffffff",
            fontSize: "24px",
            fontWeight: "600",
          }}
        >
          ✦
        </span>
      </div>
      <h1
        style={{
          margin: "0",
          fontSize: "24px",
          fontWeight: "600",
          color: "#111827",
          letterSpacing: "-0.025em",
        }}
      >
        Collaboration Invitation
      </h1>
      <p
        style={{
          margin: "12px 0 0",
          fontSize: "15px",
          color: "#6b7280",
        }}
      >
        {projectName}
      </p>
    </div>

    {/* Body */}
    <div
      style={{
        padding: "40px",
      }}
    >
      <p
        style={{
          margin: "0 0 24px",
          fontSize: "16px",
          lineHeight: "1.6",
          color: "#374151",
        }}
      >
        Hi {clientName},
      </p>

      <p
        style={{
          margin: "0 0 32px",
          fontSize: "16px",
          lineHeight: "1.6",
          color: "#374151",
          whiteSpace: "pre-line",
        }}
      >
        {message}
      </p>

      {/* Login Credentials */}
      {(loginEmail || loginPassword || loginLink) && (
        <div
          style={{
            backgroundColor: "#f9fafb",
            border: "1px solid #e5e7eb",
            borderRadius: "8px",
            padding: "24px",
            margin: "0 0 32px",
          }}
        >
          <p
            style={{
              margin: "0 0 16px",
              fontSize: "14px",
              fontWeight: "600",
              color: "#111827",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
            }}
          >
            Your Login Credentials
          </p>

          {loginEmail && (
            <div style={{ marginBottom: "12px" }}>
              <p
                style={{
                  margin: "0 0 4px",
                  fontSize: "13px",
                  color: "#6b7280",
                  fontWeight: "500",
                }}
              >
                Email
              </p>
              <p
                style={{
                  margin: "0",
                  fontSize: "15px",
                  color: "#111827",
                  fontFamily: "monospace",
                  backgroundColor: "#ffffff",
                  padding: "8px 12px",
                  borderRadius: "4px",
                  border: "1px solid #e5e7eb",
                }}
              >
                {loginEmail}
              </p>
            </div>
          )}

          {loginPassword && (
            <div style={{ marginBottom: "12px" }}>
              <p
                style={{
                  margin: "0 0 4px",
                  fontSize: "13px",
                  color: "#6b7280",
                  fontWeight: "500",
                }}
              >
                Password
              </p>
              <p
                style={{
                  margin: "0",
                  fontSize: "15px",
                  color: "#111827",
                  fontFamily: "monospace",
                  backgroundColor: "#ffffff",
                  padding: "8px 12px",
                  borderRadius: "4px",
                  border: "1px solid #e5e7eb",
                }}
              >
                {loginPassword}
              </p>
            </div>
          )}

          {loginLink && (
            <div style={{ marginTop: "20px" }}>
              <a
                href={loginLink}
                style={{
                  display: "inline-block",
                  width: "100%",
                  padding: "12px 24px",
                  backgroundColor: "#111827",
                  color: "#ffffff",
                  textDecoration: "none",
                  borderRadius: "6px",
                  fontSize: "14px",
                  fontWeight: "500",
                  textAlign: "center",
                  transition: "background-color 0.2s",
                  boxSizing: "border-box",
                }}
              >
                Login
              </a>
            </div>
          )}
        </div>
      )}

      {/* CTA Button */}
      <div
        style={{
          textAlign: "center",
          margin: "0 0 32px",
        }}
      >
        <a
          href={loginLink}
          style={{
            display: "inline-block",
            padding: "14px 32px",
            backgroundColor: "#111827",
            color: "#ffffff",
            textDecoration: "none",
            borderRadius: "8px",
            fontSize: "15px",
            fontWeight: "500",
            transition: "background-color 0.2s",
          }}
        >
          Access Project
        </a>
      </div>

      <p
        style={{
          margin: "0",
          fontSize: "14px",
          lineHeight: "1.6",
          color: "#6b7280",
          textAlign: "center",
        }}
      >
        Looking forward to working with you!
      </p>
    </div>

    {/* Footer */}
    <div
      style={{
        padding: "32px 40px",
        borderTop: "1px solid #e5e7eb",
        textAlign: "center",
      }}
    >
      <p
        style={{
          margin: "0 0 12px",
          fontSize: "13px",
          color: "#9ca3af",
          lineHeight: "1.5",
        }}
      >
        This email was sent to invite you to collaborate on a project.
      </p>
      <p
        style={{
          margin: "0",
          fontSize: "13px",
          color: "#9ca3af",
        }}
      >
        © 2024 Your Company. All rights reserved.
      </p>
    </div>
  </div>
);
export default ClientInvititation;
