import Link from "next/link";
import type { ReactNode } from "react";

type Breadcrumb = {
  label: string;
  href?: string;
};

type PageHeaderProps = {
  title: string;
  breadcrumbs?: Breadcrumb[];
  action?: ReactNode;
};

export default function PageHeader({ title, breadcrumbs = [], action }: PageHeaderProps) {
  return (
    <div className="page-header">
      <div>
        <h1>{title}</h1>
        {breadcrumbs.length > 0 && (
          <div className="breadcrumbs">
            {breadcrumbs.map((item, index) => (
              <span key={`${item.label}-${index}`}>
                {item.href ? <Link href={item.href}>{item.label}</Link> : item.label}
              </span>
            ))}
          </div>
        )}
      </div>
      {action}
    </div>
  );
}
