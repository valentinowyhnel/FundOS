-- Prevent UPDATE on AuditLog
CREATE RULE no_update_audit_logs AS ON UPDATE TO "AuditLog" DO INSTEAD NOTHING;

-- Prevent DELETE on AuditLog
CREATE RULE no_delete_audit_logs AS ON DELETE TO "AuditLog" DO INSTEAD NOTHING;

-- Prevent UPDATE on EscrowTransaction
CREATE RULE no_update_escrow_transactions AS ON UPDATE TO "EscrowTransaction" DO INSTEAD NOTHING;

-- Prevent DELETE on EscrowTransaction
CREATE RULE no_delete_escrow_transactions AS ON DELETE TO "EscrowTransaction" DO INSTEAD NOTHING;
