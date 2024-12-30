export interface ColumnInfo {
  name: string;
  type: string;
  isNullable: boolean;
  defaultValue: string | null;
  isPrimary: boolean;
}

export interface PolicyInfo {
  name: string;
  action: string;
  definition: string;
}

export interface TableSchema {
  table: string;
  columns: ColumnInfo[];
  policies: PolicyInfo[];
}