import { Pool } from "pg";
import { crmSeed, type CRMSeed } from "@/lib/crm-data";

export type CRMDataSource = "database" | "dummy";

type CRMDataResult = {
  data: CRMSeed;
  source: CRMDataSource;
};

type SnapshotRow = {
  payload: unknown;
};

const SNAPSHOT_TABLE_SQL = `
  CREATE TABLE IF NOT EXISTS crm_snapshots (
    id BIGSERIAL PRIMARY KEY,
    payload JSONB NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
  )
`;

let pool: Pool | null = null;

export async function loadCRMData(): Promise<CRMDataResult> {
  const connectionString = getConnectionString();

  if (!connectionString) {
    return { data: crmSeed, source: "dummy" };
  }

  try {
    const database = getPool(connectionString);

    await database.query(SNAPSHOT_TABLE_SQL);

    const existingRow = await database.query<SnapshotRow>(
      "SELECT payload FROM crm_snapshots ORDER BY created_at DESC, id DESC LIMIT 1"
    );

    if (!existingRow.rows[0]?.payload) {
      await database.query("INSERT INTO crm_snapshots (payload) VALUES ($1::jsonb)", [
        JSON.stringify(crmSeed)
      ]);

      return { data: crmSeed, source: "database" };
    }

    const payload = existingRow.rows[0].payload;

    if (!isCRMSeed(payload)) {
      throw new Error("Configured database contains an invalid CRM snapshot.");
    }

    return {
      data: payload,
      source: "database"
    };
  } catch (error) {
    console.error("Falling back to dummy CRM data:", error);
    return { data: crmSeed, source: "dummy" };
  }
}

function getConnectionString() {
  return (
    process.env.DATABASE_URL?.trim() ||
    process.env.POSTGRES_URL?.trim() ||
    process.env.POSTGRES_PRISMA_URL?.trim() ||
    null
  );
}

function getPool(connectionString: string) {
  if (!pool) {
    pool = new Pool({
      connectionString,
      ssl: shouldUseSsl(connectionString) ? { rejectUnauthorized: false } : undefined
    });
  }

  return pool;
}

function shouldUseSsl(connectionString: string) {
  if (process.env.PGSSLMODE === "disable") {
    return false;
  }

  return /sslmode=require/i.test(connectionString) || isHostedPostgres(connectionString);
}

function isHostedPostgres(connectionString: string) {
  return /(render\.com|neon\.tech|supabase\.co|railway\.app|aws\.neon\.tech)/i.test(
    connectionString
  );
}

function isCRMSeed(value: unknown): value is CRMSeed {
  if (!value || typeof value !== "object") {
    return false;
  }

  const candidate = value as Partial<CRMSeed>;

  return (
    hasRecord(candidate.metrics) &&
    Array.isArray(candidate.contacts) &&
    Array.isArray(candidate.deals) &&
    Array.isArray(candidate.pipeline) &&
    Array.isArray(candidate.tasks) &&
    Array.isArray(candidate.activity)
  );
}

function hasRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object";
}
