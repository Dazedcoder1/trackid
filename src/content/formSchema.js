// src/content/formSchema.js
// Schema-driven form fields — add/remove fields by editing this array,
// not by touching component JSX. Used by both Section 06A and 06B.

export const INSTITUTIONAL_FORM_FIELDS = [
  { name: 'organizationName', label: 'School / Institution Name', type: 'text', required: true },
  { name: 'contactName',      label: 'Contact Name',      type: 'text', required: true },
  { name: 'email',            label: 'Work Email',      type: 'email', required: true },
  { name: 'phone',            label: 'Phone Number',       type: 'tel', required: false },
  { name: 'role',             label: 'Role / Designation', type: 'text', required: false },
  { name: 'studentCount',     label: 'Number of Students', type: 'number', required: false },
  {
  name: 'interest',
  label: 'Interested In',
  type: 'select',
  required: true,
  options: [
    { value: 'pilot', label: 'Pilot Programme' },
    { value: 'demo', label: 'Product Demonstration' },
    { value: 'pricing', label: 'Pricing Information' },
    { value: 'partnership', label: 'Partnership Discussion' },
  ],
},
  { name: 'message',          label: 'Message',            type: 'textarea', required: false },
];

export const FAMILY_FORM_FIELDS = [
  { name: 'fullName',      label: 'Full Name',        type: 'text', required: true },
  { name: 'email',         label: 'Email Address',    type: 'email', required: true },
  { name: 'selectedDesign', label: 'Preferred Design', type: 'select', required: false,
    options: [
      { value: 'classicTeardrop',     label: 'The Classic Teardrop' },
      { value: 'sweetheartFiligree',  label: 'The Sweetheart Filigree' },
      { value: 'wiseOwl',            label: 'The Wise Owl' },
      { value: 'pathFinder',         label: 'The Path Finder' },
    ],
  },
  { name: 'giftRecipient', label: 'Gift Recipient (optional)', type: 'text', required: false },
  { name: 'message',       label: 'Message',                   type: 'textarea', required: false },
];
