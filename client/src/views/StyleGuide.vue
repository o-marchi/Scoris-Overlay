<script setup lang="ts">
import { ref } from 'vue';

const formData = ref({
  name: '',
  email: '',
  message: '',
  category: '',
  subscribe: false,
});
</script>

<template>
  <div class="container-narrow section">
    <h1 class="mb-8">Style Guide</h1>
    <p class="text-muted mb-8">
      Comprehensive guide to the SCORIS design system including colors, typography, components, and patterns.
    </p>

    <!-- Color Palette -->
    <section class="mb-12">
      <h2 class="mb-6">Color Palette</h2>

      <div class="mb-8">
        <h3 class="mb-4">Theme Colors</h3>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div class="card">
            <div class="w-full h-24 rounded-lg mb-3 bg-primary"></div>
            <div class="font-display font-bold">Primary</div>
            <code class="text-sm text-muted">#EEBF3D (Gold)</code>
          </div>

          <div class="card">
            <div class="w-full h-24 rounded-lg mb-3 bg-secondary"></div>
            <div class="font-display font-bold">Secondary</div>
            <code class="text-sm text-muted">#6B4FBB (Purple)</code>
          </div>

          <div class="card">
            <div class="w-full h-24 rounded-lg mb-3" style="background-color: var(--color-surface-dim)"></div>
            <div class="font-display font-bold">Surface Dim</div>
            <code class="text-sm text-muted">--color-surface-dim</code>
          </div>

          <div class="card">
            <div class="w-full h-24 rounded-lg mb-3" style="background-color: var(--color-surface)"></div>
            <div class="font-display font-bold">Surface</div>
            <code class="text-sm text-muted">--color-surface</code>
          </div>

          <div class="card">
            <div class="w-full h-24 rounded-lg mb-3" style="background-color: var(--color-surface-bright)"></div>
            <div class="font-display font-bold">Surface Bright</div>
            <code class="text-sm text-muted">--color-surface-bright</code>
          </div>

          <div class="card">
            <div class="w-full h-24 rounded-lg mb-3" style="background-color: var(--color-text)"></div>
            <div class="font-display font-bold">Text</div>
            <code class="text-sm text-muted">--color-text</code>
          </div>

          <div class="card">
            <div class="w-full h-24 rounded-lg mb-3" style="background-color: var(--color-text-muted)"></div>
            <div class="font-display font-bold">Text Muted</div>
            <code class="text-sm text-muted">--color-text-muted</code>
          </div>
        </div>
      </div>

      <div class="mb-8">
        <h3 class="mb-4">Semantic Levels</h3>
        <div class="space-y-4">
          <div class="level-0 p-6 rounded-lg">
            <code class="font-semibold">.level-0</code>
            <span class="text-muted ml-4">Base background level</span>
          </div>
          <div class="level-1 p-6 rounded-lg">
            <code class="font-semibold">.level-1</code>
            <span class="text-muted ml-4">First elevation level with subtle shadow</span>
          </div>
          <div class="level-2 p-6 rounded-lg">
            <code class="font-semibold">.level-2</code>
            <span class="text-muted ml-4">Second elevation level with medium shadow</span>
          </div>
          <div class="level-3 p-6 rounded-lg">
            <code class="font-semibold">.level-3</code>
            <span class="text-muted ml-4">Third elevation level with strong shadow</span>
          </div>
        </div>
      </div>
    </section>

    <div class="divider"></div>

    <!-- Typography -->
    <section class="mb-12">
      <h2 class="mb-6">Typography</h2>

      <div class="mb-8">
        <h3 class="mb-4">Fonts</h3>
        <div class="space-y-2">
          <p class="font-sans text-lg">
            <span class="font-bold">Inter</span> - Body text font (font-sans)
          </p>
          <p class="font-display text-lg">
            <span class="font-bold">Oxanium</span> - Display/heading font (font-display)
          </p>
        </div>
      </div>

      <div class="mb-8">
        <h3 class="mb-4">Headings</h3>
        <div class="space-y-4">
          <div>
            <h1>Heading 1</h1>
            <code class="text-sm text-muted">h1 / text-5xl</code>
          </div>
          <div>
            <h2>Heading 2</h2>
            <code class="text-sm text-muted">h2 / text-4xl</code>
          </div>
          <div>
            <h3>Heading 3</h3>
            <code class="text-sm text-muted">h3 / text-3xl</code>
          </div>
          <div>
            <h4>Heading 4</h4>
            <code class="text-sm text-muted">h4 / text-2xl</code>
          </div>
          <div>
            <h5>Heading 5</h5>
            <code class="text-sm text-muted">h5 / text-xl</code>
          </div>
          <div>
            <h6>Heading 6</h6>
            <code class="text-sm text-muted">h6 / text-lg</code>
          </div>
        </div>
      </div>

      <div>
        <h3 class="mb-4">Body Text</h3>
        <p class="mb-2">
          Regular paragraph text. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
        <p class="text-muted mb-2">
          Muted text for less important information. Use <code>.text-muted</code> class.
        </p>
        <p class="text-primary mb-2">
          Primary colored text. Use <code>.text-primary</code> class.
        </p>
        <p class="text-secondary">
          Secondary colored text. Use <code>.text-secondary</code> class.
        </p>
      </div>
    </section>

    <div class="divider"></div>

    <!-- Buttons -->
    <section class="mb-12">
      <h2 class="mb-6">Buttons</h2>

      <div class="mb-8">
        <h3 class="mb-4">Button Variants</h3>
        <div class="flex flex-wrap gap-3">
          <button class="btn btn-primary">Primary Button</button>
          <button class="btn btn-secondary">Secondary Button</button>
          <button class="btn btn-outline">Outline Button</button>
          <button class="btn btn-ghost">Ghost Button</button>
          <button class="btn btn-primary" disabled>Disabled Button</button>
        </div>
      </div>

      <div class="mb-8">
        <h3 class="mb-4">Button Sizes</h3>
        <div class="flex flex-wrap items-center gap-3">
          <button class="btn btn-primary btn-sm">Small</button>
          <button class="btn btn-primary">Default</button>
          <button class="btn btn-primary btn-lg">Large</button>
        </div>
      </div>

      <div>
        <h3 class="mb-4">Button with Icons</h3>
        <div class="flex flex-wrap gap-3">
          <button class="btn btn-primary">
            <span>➕</span>
            Add New
          </button>
          <button class="btn btn-outline">
            Download
            <span>⬇️</span>
          </button>
        </div>
      </div>
    </section>

    <div class="divider"></div>

    <!-- Forms -->
    <section class="mb-12">
      <h2 class="mb-6">Forms</h2>

      <form @submit.prevent class="max-w-2xl">
        <div class="form-group">
          <label class="form-label" for="name">Name</label>
          <input
            id="name"
            v-model="formData.name"
            type="text"
            class="form-input"
            placeholder="Enter your name"
          />
          <div class="form-help">This is a helper text for the input field</div>
        </div>

        <div class="form-group">
          <label class="form-label" for="email">Email</label>
          <input
            id="email"
            v-model="formData.email"
            type="email"
            class="form-input"
            placeholder="you@example.com"
          />
          <div class="form-error">This field is required</div>
        </div>

        <div class="form-group">
          <label class="form-label" for="category">Category</label>
          <select id="category" v-model="formData.category" class="form-select">
            <option value="">Select a category</option>
            <option value="1">Category 1</option>
            <option value="2">Category 2</option>
            <option value="3">Category 3</option>
          </select>
        </div>

        <div class="form-group">
          <label class="form-label" for="message">Message</label>
          <textarea
            id="message"
            v-model="formData.message"
            class="form-textarea"
            placeholder="Your message here..."
          ></textarea>
        </div>

        <div class="form-group">
          <label class="form-check-label">
            <input
              v-model="formData.subscribe"
              type="checkbox"
              class="form-checkbox"
            />
            Subscribe to newsletter
          </label>
        </div>

        <div class="flex gap-3">
          <button type="submit" class="btn btn-primary">Submit</button>
          <button type="button" class="btn btn-secondary">Cancel</button>
        </div>
      </form>
    </section>

    <div class="divider"></div>

    <!-- Cards -->
    <section class="mb-12">
      <h2 class="mb-6">Cards</h2>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div class="card">
          <div class="card-header">Basic Card</div>
          <div class="card-body">
            This is a basic card component with header and body content.
          </div>
        </div>

        <div class="card">
          <div class="card-header">Card with Footer</div>
          <div class="card-body">
            This card includes a footer section below.
          </div>
          <div class="card-footer">
            <button class="btn btn-primary btn-sm">Action</button>
          </div>
        </div>
      </div>

      <div class="mb-6">
        <h3 class="mb-4">Hoverable Cards</h3>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div class="card-hover">
            <div class="card-header">Tournament A</div>
            <div class="card-body">Click to view details</div>
          </div>
          <div class="card-hover">
            <div class="card-header">Tournament B</div>
            <div class="card-body">Click to view details</div>
          </div>
          <div class="card-hover">
            <div class="card-header">Tournament C</div>
            <div class="card-body">Click to view details</div>
          </div>
        </div>
      </div>
    </section>

    <div class="divider"></div>

    <!-- Badges -->
    <section class="mb-12">
      <h2 class="mb-6">Badges</h2>

      <div class="flex flex-wrap gap-3 items-center">
        <span class="badge badge-primary">Primary</span>
        <span class="badge badge-secondary">Secondary</span>
        <span class="badge badge-outline">Outline</span>
        <span class="badge badge-primary">New</span>
        <span class="badge badge-secondary">Beta</span>
        <span class="badge badge-outline">v2.0</span>
      </div>
    </section>

    <div class="divider"></div>

    <!-- Alerts -->
    <section class="mb-12">
      <h2 class="mb-6">Alerts</h2>

      <div class="alert alert-info">
        <strong>Info:</strong> This is an informational alert message.
      </div>

      <div class="alert alert-success">
        <strong>Success:</strong> Your changes have been saved successfully!
      </div>

      <div class="alert alert-warning">
        <strong>Warning:</strong> Please review your input before continuing.
      </div>

      <div class="alert alert-error">
        <strong>Error:</strong> Something went wrong. Please try again.
      </div>
    </section>

    <div class="divider"></div>

    <!-- Tables -->
    <section class="mb-12">
      <h2 class="mb-6">Tables</h2>

      <table class="table">
        <thead>
          <tr>
            <th>Tournament</th>
            <th>Date</th>
            <th>Players</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="font-semibold">Summer Championship</td>
            <td>2024-06-15</td>
            <td>32</td>
            <td><span class="badge badge-primary">Active</span></td>
          </tr>
          <tr>
            <td class="font-semibold">Winter Cup</td>
            <td>2024-12-01</td>
            <td>64</td>
            <td><span class="badge badge-outline">Upcoming</span></td>
          </tr>
          <tr>
            <td class="font-semibold">Spring Invitational</td>
            <td>2024-03-20</td>
            <td>16</td>
            <td><span class="badge badge-secondary">Completed</span></td>
          </tr>
        </tbody>
      </table>
    </section>

    <div class="divider"></div>

    <!-- Shadows -->
    <section class="mb-12">
      <h2 class="mb-6">Shadows</h2>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="p-8 rounded-lg bg-surface shadow-s">
          <div class="font-display font-bold mb-2">Small Shadow</div>
          <code class="text-sm">.shadow-s</code>
        </div>
        <div class="p-8 rounded-lg bg-surface shadow-m">
          <div class="font-display font-bold mb-2">Medium Shadow</div>
          <code class="text-sm">.shadow-m</code>
        </div>
        <div class="p-8 rounded-lg bg-surface shadow-l">
          <div class="font-display font-bold mb-2">Large Shadow</div>
          <code class="text-sm">.shadow-l</code>
        </div>
      </div>
    </section>

    <div class="divider"></div>

    <!-- Layout Utilities -->
    <section class="mb-12">
      <h2 class="mb-6">Layout Utilities</h2>

      <div class="space-y-4">
        <div>
          <h3 class="mb-2">Container</h3>
          <code class="text-sm text-muted">.container</code>
          <p class="text-muted">Max-width: 1200px, centered with padding</p>
        </div>

        <div>
          <h3 class="mb-2">Container Narrow</h3>
          <code class="text-sm text-muted">.container-narrow</code>
          <p class="text-muted">Max-width: 800px, centered with padding</p>
        </div>

        <div>
          <h3 class="mb-2">Section</h3>
          <code class="text-sm text-muted">.section</code>
          <p class="text-muted">Vertical padding of 3rem for sections</p>
        </div>

        <div>
          <h3 class="mb-2">Divider</h3>
          <code class="text-sm text-muted">.divider</code>
          <p class="text-muted">Horizontal line for separating sections</p>
        </div>
      </div>
    </section>

    <div class="divider"></div>

    <!-- Usage Examples -->
    <section class="mb-12">
      <h2 class="mb-6">Usage Guidelines</h2>

      <div class="card mb-6">
        <div class="card-header">Design Tokens</div>
        <div class="card-body space-y-2">
          <p><code>--color-primary</code> - Use for primary actions, branding, and emphasis</p>
          <p><code>--color-surface-*</code> - Use for backgrounds at different elevation levels</p>
          <p><code>--color-text</code> - Primary text color</p>
          <p><code>--color-text-muted</code> - Secondary text, captions, and less important content</p>
          <p><code>--shadow-*</code> - Apply appropriate shadow based on elevation level</p>
        </div>
      </div>

      <div class="card">
        <div class="card-header">Best Practices</div>
        <div class="card-body space-y-2">
          <p>✓ Use semantic level classes (.level-0 through .level-3) for visual hierarchy</p>
          <p>✓ Apply Tailwind utility classes for spacing and layout</p>
          <p>✓ Use CSS custom properties for colors to ensure theme compatibility</p>
          <p>✓ Maintain consistent spacing using rem units</p>
          <p>✓ Test components in both light and dark themes</p>
        </div>
      </div>
    </section>
  </div>
</template>
