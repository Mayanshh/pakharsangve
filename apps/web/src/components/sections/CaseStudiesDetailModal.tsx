"use client";

import React from "react";
import {
  ACTIVE_CASE_STUDY_TEMPLATE,
  type CaseStudy,
} from "@/data/CaseStudies";
import TemplateOneEditorial from "./case-study-templates/TemplateOneEditorial";
import TemplateTwoSplitShowcase from "./case-study-templates/TemplateTwoSplitShowcase";
import TemplateThreeDarkNarrative from "./case-study-templates/TemplateThreeDarkNarrative";

interface CaseStudyDetailViewProps {
  caseStudy: CaseStudy;
}

export default function CaseStudyDetailView({
  caseStudy,
}: CaseStudyDetailViewProps) {
  switch (ACTIVE_CASE_STUDY_TEMPLATE) {
    case 2:
      return <TemplateTwoSplitShowcase caseStudy={caseStudy} />;
    case 3:
      return <TemplateThreeDarkNarrative caseStudy={caseStudy} />;
    case 1:
    default:
      return <TemplateOneEditorial caseStudy={caseStudy} />;
  }
}