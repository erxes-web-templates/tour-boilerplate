// utils/renderSections.tsx
import React from "react";

// Define the section types
type KnownSectionType = "hero" | "tours" | "imageText" | "form" | "youtube";

// Define the structure of a section
interface Section {
  type: string;
  name?: string;
  config?: any;
  order: number;
  content?: string;
  contentType?: string;
  contentTypeId?: string;
}

// Props for the render function
interface RenderSectionsProps {
  sections: Section[];
  components: {
    [key in KnownSectionType]?: React.ComponentType<{ section: Section }>;
  };
}

/**
 * Function to render page sections based on their type
 * Works with both Server and Client Components
 */
export function renderSections({ sections, components }: RenderSectionsProps) {
  if (!sections || !Array.isArray(sections)) {
    console.warn("Invalid or missing sections array");
    return null;
  }

  return sections.map((section, index) => {
    if (!section || typeof section !== "object" || !section.type) {
      console.warn(`Invalid section at index ${index}`);
      return null;
    }

    const Component = components[section.type as KnownSectionType];

    if (!Component) {
      console.warn(`No component found for section type: ${section.type}`);
      return null;
    }

    return <Component key={index} section={section} />;
  });
}
