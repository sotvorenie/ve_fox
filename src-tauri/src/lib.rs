use tauri::{Manager, Listener};
use tauri_plugin_global_shortcut::{Code, GlobalShortcutExt, Shortcut, ShortcutState};

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .plugin(tauri_plugin_dialog::init())
        .plugin(tauri_plugin_global_shortcut::Builder::new().build())
        .setup(|app| {
            let window = app.get_webview_window("main").unwrap();
            let w = window.clone();

            // 1. ESCAPE - единственный способ войти/выйти из фуллскрина
            // Это уберет дерганье при нажатии на системный "квадратик"
            let esc_shortcut = Shortcut::new(None, Code::Escape);
            app.global_shortcut().on_shortcut(esc_shortcut, move |_app, _shortcut, event| {
                if event.state() == ShortcutState::Pressed {
                    let is_fs = w.is_fullscreen().unwrap_or(false);
                    let _ = w.set_fullscreen(!is_fs); // Переключаем: если был FS - выходим, если нет - заходим
                }
            }).unwrap();

            let w_event = window.clone();
            window.on_window_event(move |event| {
                if let tauri::WindowEvent::Resized(size) = event {
                    let is_fs = w_event.is_fullscreen().unwrap_or(false);

                    // Если окно в ПОЛНОМ ЭКРАНЕ - мы ВООБЩЕ ничего не делаем.
                    // Это лечит дерганье и панель задач.
                    if is_fs {
                        return;
                    }

                    // Логика 16:9
                    let new_width = size.width as f64;
                    let aspect_ratio = 16.0 / 9.0;
                    let new_height = (new_width / aspect_ratio).round();

                    // Корректируем размер только если окно НЕ развернуто на весь экран (Maximize)
                    // чтобы не ломать стандартное поведение Windows
                    if !w_event.is_maximized().unwrap_or(false) {
                        if (size.height as f64 - new_height).abs() > 2.0 {
                            let _ = w_event.set_size(tauri::Size::Physical(tauri::PhysicalSize {
                                width: size.width,
                                height: new_height as u32,
                            }));
                        }
                    }
                }
            });

            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}