## General
- **Tone:** Be concise but explain what the code does.
- **Style:** Follow existing code patterns in the repository.
- **Environment:**
    - Do not try to start the frontend or backend servers. Look for existing terminals where they might already be running to check for compiler errors.
    - **Do not guess** database ports or names. Check running terminals or configuration files first.
    - **Database Connection:** The database name is `NetSecDB`, port is `5432`, user is `postgres`. Always use these values for `psql` commands.
- **Active Terminal Monitoring:**
    - **CRITICAL:** After making ANY code changes, check active terminals for errors:
        - **Frontend Server terminal:** Check for Angular compilation errors, TypeScript errors, or runtime warnings.
        - **Backend Server terminal:** Check for Node.js/TypeScript compilation errors, runtime exceptions, or API errors.
    - **Proactive Checks:** Don't wait for the user to report errors. After editing files, immediately check the relevant terminal(s) to verify the changes compile successfully.
    - **Fix Before Moving On:** If terminal output shows errors introduced by your changes, fix them before considering the task complete.
- **Git Operations:**
    - **CRITICAL:** Do NOT run `git add`, `git commit`, or `git push` unless explicitly asked by the user.
    - Staging files without permission disrupts the user's workflow.
    - Only perform git operations when it makes sense in context (e.g., user explicitly requests a commit).

## Frontend (Angular)
- **Framework:** Angular v21.0.0 (standalone by default).
- **Typing:** Use **strict typing**. Avoid `any`.
- **Async:** Prefer **Observables** over Promises.
- **Architecture:**
    - Use **Services** for all API calls.
    - Store data/state in Services.
    - Components should reference Service objects/observables; avoid heavy logic in components.
- **Styling - Bootstrap First:**
    - **CRITICAL:** This project uses **Bootstrap 5.3.8**. Always prefer Bootstrap utility classes over custom CSS.
    - **Prioritization Order:**
        1. **Bootstrap utility classes** (e.g., `d-flex`, `justify-content-between`, `mb-3`, `text-muted`, `btn btn-primary`)
        2. **Global styles** in `src/styles.css` for app-wide patterns
        3. **Component-specific SCSS** only when Bootstrap cannot achieve the desired result
    - **Before Writing Custom CSS:** Ask yourself: "Can Bootstrap do this?" Check Bootstrap docs for:
        - Spacing: `m-*`, `p-*`, `gap-*`
        - Flexbox: `d-flex`, `flex-column`, `align-items-*`, `justify-content-*`
        - Grid: `row`, `col-*`, `container`, `container-fluid`
        - Typography: `fs-*`, `fw-*`, `text-*`
        - Colors: `text-*`, `bg-*`, `border-*`
        - Buttons: `btn`, `btn-*`, `btn-outline-*`
        - Cards, Modals, Alerts, Badges, etc.
    - **Global Styles Location:** `src/styles.css` - Add reusable custom classes here, not in component files.
    - **Prohibited:** Do NOT duplicate Bootstrap functionality with custom CSS. Do NOT use inline styles.
- **Component Reuse - Shared Component:**
    - **CRITICAL:** Before creating a new component, check `src/app/components/shared/` for existing reusable components.
    - **Creating New Shared Components:** If a UI pattern will be used in multiple places, create it in `src/app/components/shared/` and export it.
    - **Consistency:** Use shared components to maintain visual consistency across the application.
- **Dialog/Modal Components - Memory Leaks:**
    - **CRITICAL:** Any component that subscribes to `valueChanges`, `Observable` streams, or event emitters MUST implement `OnDestroy` with a `destroy$` subject and `takeUntil(this.destroy$)` pattern.
    - This is especially important for **dialog components** because they are created/destroyed frequently.
    - **Pattern:**
      ```typescript
      export class MyModalComponent implements OnInit, OnDestroy {
          private destroy$ = new Subject<void>();
          ngOnInit() {
              this.form.get('field')?.valueChanges
                  .pipe(takeUntil(this.destroy$))
                  .subscribe(val => { ... });
          }
          ngOnDestroy() {
              this.destroy$.next();
              this.destroy$.complete();
          }
      }
      ```
- **Template Bindings Must Match Model:**
    - Before using `object.property.value` or any property in a template, verify it exists on the TypeScript interface. Use the actual property name from the model (e.g., `.result` not `.status`).
    - Angular won't error on undefined properties in templates — they silently evaluate to `undefined`.

## Backend (Node.js/TypeScript)
- **Middleware:** Use existing middleware for requests.
- **Route Parameter Naming:**
    - **CRITICAL:** Route params and middleware must use consistent casing. If a route uses `:objectId` (lowercase d), middleware must check `request.params.objectId`, not `request.params.objectID`.
- **Nullish Coalescing (`??`) vs Logical OR (`||`):**
    - **CRITICAL:** For numeric values where `0` is valid, ALWAYS use `??` instead of `||`.
    - `Number(value || 0)` treats `0` as falsy and replaces it — this silently drops legitimate zero values
    - **Correct:** `Number(value ?? 0)` — only replaces `null`/`undefined`, preserves `0`.
- **Error Handling:**
    - **Mandatory:** Wrap logic in `try-catch` blocks.
    - Ensure errors are logged or handled gracefully.

## Cross-Layer Feature Checklist
When implementing features that span multiple layers (database, backend, frontend) scan related files, ensure consistent coding structure and practices.

### When Adding New Backend Response Fields:
1. **Update the frontend TypeScript interface/model** to include the new fields
2. **Update any components** that display this data to show the new fields
3. **Update any services** that transform or map the data

### When Adding New Endpoints:
1. **Always add authorization middleware** - check `backend/index.ts` for patterns
3. **Add corresponding frontend service method** to call the endpoint

### When Modifying Data That Appears in Multiple Views:
1. **Identify ALL views** that display this data (dashboard, tables, modals, process flow, etc.)
2. **Ensure consistency** - if one view shows a state/badge, all views should show it
3. **Test each view** after changes to verify consistency

### When Adding Archival/Deletion Features:
1. **Check for related records** that will be affected
2. **Add warnings in confirmation dialogs** listing what will be impacted
3. **Consider cascading effects** on calculations and reports