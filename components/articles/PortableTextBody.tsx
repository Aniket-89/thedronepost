import {
  PortableText,
  type PortableTextReactComponents,
  type PortableTextBlock,
} from "next-sanity";
import Image from "next/image";
import { urlFor } from "@/lib/sanity/image";

// ---------------------------------------------------------------------------
// Mock body — used when Portable Text body is empty or not yet authored
// ---------------------------------------------------------------------------

const MOCK_PARAGRAPHS = [
  "The Indian drone industry is experiencing unprecedented growth, driven by supportive government policies, increasing enterprise adoption, and a thriving startup ecosystem. This development marks a significant milestone in the country's journey toward becoming a global leader in unmanned aerial systems.",
  "Industry experts predict that India's drone market will reach $1.8 billion by 2026, with applications spanning agriculture, defense, logistics, and urban infrastructure. The government's Production Linked Incentive (PLI) scheme has been instrumental in attracting both domestic and international investment.",
  "Key stakeholders across the value chain — from component manufacturers to software developers and service providers — are positioning themselves to capitalize on this growing opportunity. The convergence of regulatory clarity, technological advancement, and market demand is creating a fertile environment for innovation.",
  "The implications extend beyond commercial applications. Drone technology is being leveraged for disaster response, environmental monitoring, and infrastructure inspection, demonstrating the versatility and social impact of unmanned systems in the Indian context.",
  "As the ecosystem matures, collaboration between industry, academia, and government agencies will be crucial. Training programs, research initiatives, and standardization efforts are laying the groundwork for sustainable growth in this transformative sector.",
];

// ---------------------------------------------------------------------------
// Custom Portable Text components
// ---------------------------------------------------------------------------

const components: Partial<PortableTextReactComponents> = {
  block: {
    h2: ({ children }) => (
      <h2 className="text-2xl md:text-3xl font-bold font-heading tracking-tight mt-10 mb-4">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-xl md:text-2xl font-bold font-heading tracking-tight mt-8 mb-3">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="text-lg font-bold font-heading mt-6 mb-2">{children}</h4>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-2 border-accent pl-4 italic text-text-muted my-6">
        {children}
      </blockquote>
    ),
    normal: ({ children }) => (
      <p className="text-base leading-[1.8] text-text">{children}</p>
    ),
  },
  marks: {
    strong: ({ children }) => <strong className="font-bold">{children}</strong>,
    em: ({ children }) => <em>{children}</em>,
    code: ({ children }) => (
      <code className="bg-surface px-1.5 py-0.5 text-sm font-mono text-accent">
        {children}
      </code>
    ),
    link: ({ children, value }) => {
      const href = value?.href || "#";
      const isExternal = href.startsWith("http");
      return (
        <a
          href={href}
          className="text-accent underline underline-offset-2 hover:text-accent-dark transition-colors"
          {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        >
          {children}
        </a>
      );
    },
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc list-inside space-y-2 my-4 text-text">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal list-inside space-y-2 my-4 text-text">{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => <li className="leading-[1.8]">{children}</li>,
    number: ({ children }) => <li className="leading-[1.8]">{children}</li>,
  },
  types: {
    image: ({ value }) => {
      if (!value?.asset) return null;
      const built = urlFor(value);
      if (!built) return null;
      const imageUrl = built.width(1200).quality(85).url();
      return (
        <figure className="my-8">
          <Image
            src={imageUrl}
            alt={value.alt || "Article image"}
            width={1200}
            height={675}
            className="w-full h-auto"
            sizes="(max-width: 720px) 100vw, 720px"
            unoptimized
          />
          {value.caption && (
            <figcaption className="text-sm text-text-muted mt-2 text-center">
              {value.caption}
            </figcaption>
          )}
        </figure>
      );
    },
  },
};

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

type PortableTextBodyProps = {
  body?: PortableTextBlock[] | unknown[];
};

export function PortableTextBody({ body }: PortableTextBodyProps) {
  // If no Portable Text body, render mock paragraphs
  if (!body || !Array.isArray(body) || body.length === 0) {
    return (
      <div className="space-y-6">
        {MOCK_PARAGRAPHS.map((p, i) => (
          <p key={i} className="text-base leading-[1.8] text-text">
            {p}
          </p>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PortableText
        value={body as PortableTextBlock[]}
        components={components}
      />
    </div>
  );
}
